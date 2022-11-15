import { useRouter } from "next/router";
import useAxios from "axios-hooks";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { includes, isNil } from "lodash";
import currency from "currency.js";
import DatePicker from "../../components/DatePicker";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import ChairIcon from "@mui/icons-material/Chair";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const theatreList = [
  { value: 0, label: "Theatre 1" },
  { value: 1, label: "Theatre 2" },
];

const timeList = [
  { value: 0, label: "19:00" },
  { value: 1, label: "19:30" },
];

const Details = () => {
  const router = useRouter();
  const isTH = router.locale === "th";
  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [theatre, setTheatre] = useState();
  const [time, setTime] = useState();
  const [seats, setSeats] = useState([]);
  const booked = ["C3", "C4"];

  const handleChecked = (s) => {
    if (includes(seats, s)) {
      const prevSeats = [...seats];
      const nextSeats = prevSeats.filter((t) => t !== s);
      setSeats(nextSeats);
    } else {
      setSeats([...seats, s]);
    }
  };

  useEffect(() => {
    if (!isNil(date) && !isNil(theatre) && !isNil(time)) {
      setActiveStep(1);
      if (seats.length > 0) {
        setActiveStep(2);
      } else {
        setActiveStep(1);
      }
    }
  }, [date, theatre, time, seats]);

  const steps = ["Select Showtime", "Select Seats", "Buy"];
  const [{ data, loading, error }] = useAxios(
    `https://a882e854-bc3c-47b0-9e84-cdcf71cd328f.mock.pstmn.io/api/movie/${router.query.id}`
  );

  if (loading) return <>Loading...</>;
  if (error) return <>Error...</>;

  const {
    id,
    image,
    Date: showtime,
    NameEN,
    NameTH,
    descriptionEN,
    descriptionTH,
    Type,
    Duration,
  } = data;
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          height: 1,
          minHeight: "100vh",
          background: `linear-gradient(123.95deg, rgba(0, 0, 0, 0.9) 12.92%, rgba(131, 0, 0, 0.9) 87%);`,
        }}
      >
        <Container
          sx={{ background: `rgba(255, 255, 255, 0.1);`, px: 3, py: 2 }}
        >
          <Stack gap={6}>
            <Box>
              <Button
                onClick={() => router.push("/")}
                variant="text"
                sx={{ color: (t) => t.palette.common.white }}
              >
                <ChevronLeftIcon />
                Back
              </Button>
            </Box>
            <Stack direction="row" gap={6}>
              <Box>
                <img
                  src={image}
                  alt={id}
                  width={250}
                  height="100%"
                  style={{ borderRadius: 25, objectFit: "cover" }}
                />
              </Box>
              <Stack gap={3}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#F1AD3F",
                  }}
                >
                  {dayjs(showtime).format("DD MMM YYYY")}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: (t) => t.palette.common.white,
                    textTransform: "uppercase",
                  }}
                >
                  {isTH ? NameTH : NameEN}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: (t) => t.palette.common.white,
                  }}
                >
                  {isTH ? descriptionTH : descriptionEN}
                </Typography>
                <Stack direction="row" gap={1}>
                  <Chip sx={{ backgroundColor: "#E1E1E7" }} label={Type} />
                  <Chip sx={{ backgroundColor: "#E1E1E7" }} label={Duration} />
                </Stack>
              </Stack>
            </Stack>
            <Box>
              <ButtonGroup sx={{ height: 50, width: 1 }}>
                {steps.map((label, index) => (
                  <Button
                    key={index}
                    sx={{
                      width: 1,
                      ":hover": {
                        backgroundColor:
                          activeStep >= index
                            ? (t) => t.palette.common.white
                            : "",
                        borderColor: (t) => t.palette.common.white,
                      },
                      backgroundColor:
                        activeStep >= index
                          ? (t) => t.palette.common.white
                          : "",
                      borderRadius: 20,
                      borderColor: (t) => t.palette.common.white,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          activeStep >= index
                            ? (t) => t.palette.common.black
                            : (t) => t.palette.common.white,
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: "none",
                      }}
                    >
                      {label}
                    </Typography>
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Stack direction="row" gap={2}>
              <Stack width={1} alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: (t) => t.palette.common.white,
                  }}
                >
                  Select showtime
                </Typography>
                <DatePicker value={date} setValue={setDate} />
              </Stack>
              <Stack width={1} alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: (t) => t.palette.common.white,
                  }}
                >
                  Select Theatre
                </Typography>
                <Dropdown
                  list={theatreList}
                  value={theatre}
                  setValue={setTheatre}
                />
              </Stack>
              <Stack width={1} alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: (t) => t.palette.common.white,
                  }}
                >
                  Select Time
                </Typography>
                <Dropdown list={timeList} value={time} setValue={setTime} />
              </Stack>
            </Stack>
            {activeStep > 0 && (
              <Stack gap={2}>
                <Stack
                  width={1}
                  alignItems="center"
                  sx={{
                    background: "#D1A154",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 25,
                      color: (t) => t.palette.common.white,
                      textTransform: "uppercase",
                    }}
                  >
                    Screen
                  </Typography>
                </Stack>
                <Stack>
                  <Container>
                    <Stack gap={4}>
                      {["E", "D", "C", "B", "A"].map((row) => {
                        return (
                          <Stack
                            key={row}
                            direction="row"
                            gap={4}
                            justifyContent="center"
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 25,
                                color: (t) => t.palette.common.white,
                              }}
                            >
                              {row}
                            </Typography>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                              const seat = `${row}${col}`;
                              return includes(seats, seat) ? (
                                <Stack
                                  key={col}
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                    width: 50,
                                    ":hover": {
                                      cursor: "pointer",
                                    },
                                  }}
                                >
                                  <CheckCircleIcon
                                    sx={{ color: "#D1A154", fontSize: 50 }}
                                    onClick={() => handleChecked(seat)}
                                  />
                                </Stack>
                              ) : includes(booked, seat) ? (
                                <Stack
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                    width: 50,
                                    ":hover": {
                                      cursor: "not-allowed",
                                    },
                                  }}
                                >
                                  <ChairIcon
                                    sx={{ color: "#D0382D", fontSize: 50 }}
                                  />
                                </Stack>
                              ) : (
                                <Stack
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                    width: 50,
                                    ":hover": {
                                      cursor: "pointer",
                                    },
                                  }}
                                >
                                  <ChairIcon
                                    sx={{ color: "#3B8824", fontSize: 50 }}
                                    onClick={() => handleChecked(seat)}
                                  />
                                </Stack>
                              );
                            })}
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 25,
                                color: (t) => t.palette.common.white,
                              }}
                            >
                              {row}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Container>
                </Stack>
                <Divider sx={{ borderColor: (t) => t.palette.common.white }} />
                <Stack alignItems="center" gap={1}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: (t) => t.palette.common.white,
                      textTransform: "uppercase",
                    }}
                  >
                    Summary
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      width: 1,
                      border: `1px solid #D9D9D9`,
                      borderRadius: "20px",
                    }}
                  >
                    <Stack direction="row" gap={2}>
                      <Box>
                        <img
                          src={image}
                          alt={id}
                          width={120}
                          height="100%"
                          style={{ borderRadius: 20, objectFit: "cover" }}
                        />
                      </Box>
                      <Stack gap={3} width={1}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: (t) => t.palette.common.white,
                            textTransform: "uppercase",
                          }}
                        >
                          {isTH ? NameTH : NameEN}
                        </Typography>
                        <Stack direction="row" gap={3}>
                          <Stack gap={3}>
                            <Stack direction="row" gap={3}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: 16,
                                  color: (t) => t.palette.common.white,
                                }}
                              >
                                Showtime
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: 16,
                                  color: (t) => t.palette.common.white,
                                }}
                              >
                                Date :{" "}
                                {dayjs(new Date(date)).format("DD/MM/YYYY")}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: 16,
                                  color: (t) => t.palette.common.white,
                                }}
                              >
                                Theatre : {theatreList[theatre].label}
                              </Typography>
                            </Stack>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 18,
                                color: (t) => t.palette.common.white,
                              }}
                            >
                              {`Seats : ${
                                seats.length > 0 ? seats.sort().join(", ") : "-"
                              }`}
                            </Typography>
                          </Stack>
                          <Stack gap={3}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 16,
                                color: (t) => t.palette.common.white,
                              }}
                            >
                              Time : {timeList[time].label}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 18,
                                color: (t) => t.palette.common.white,
                              }}
                            >
                              {`Total Price : ${
                                seats.length > 0
                                  ? `${currency(seats.length * 300, {
                                      pattern: "#",
                                      precision: 0,
                                    }).format()} THB`
                                  : "-"
                              }`}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      <Stack justifyContent="center">
                        <Button
                          disabled={seats.length === 0}
                          fullWidth
                          variant="outlined"
                          sx={{
                            width: 230,
                            height: 50,
                            border:
                              seats.length > 0
                                ? "none"
                                : `1px solid #D9D9D9 !important`,
                            borderRadius: "15px",
                            backgroundColor: seats.length > 0 ? "#D1A154" : "",
                            ":hover": {
                              backgroundColor:
                                seats.length > 0 ? "#D1A154" : "",
                              border:
                                seats.length > 0
                                  ? "none"
                                  : `1px solid #D9D9D9 !important`,
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 16,
                              color:
                                seats.length > 0
                                  ? (t) => t.palette.common.black
                                  : (t) => t.palette.common.white,
                            }}
                          >
                            BUY NOW
                          </Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Details;
