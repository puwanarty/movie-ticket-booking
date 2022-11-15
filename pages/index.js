import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import useAxios from "axios-hooks";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState("Now_Showing");
  const [{ data, loading, error }] = useAxios(
    "https://a882e854-bc3c-47b0-9e84-cdcf71cd328f.mock.pstmn.io/api/movielist"
  );

  const isTH = router.locale === "th";

  if (loading) return <>Loading...</>;
  if (error) return <>Error...</>;

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
          <Stack gap={4}>
            <Stack direction="row" justifyContent="center" gap={2}>
              <Button
                variant="text"
                sx={{ textTransform: "none" }}
                onClick={() => setState("Now_Showing")}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color:
                      state === "Now_Showing"
                        ? (t) => t.palette.common.white
                        : `rgba(255, 255, 255, 0.5);`,
                  }}
                >
                  Now Showing
                </Typography>
              </Button>
              <Button
                variant="text"
                sx={{ textTransform: "none" }}
                onClick={() => setState("Coming_Soon")}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color:
                      state === "Coming_Soon"
                        ? (t) => t.palette.common.white
                        : `rgba(255, 255, 255, 0.5);`,
                  }}
                >
                  Coming Soon
                </Typography>
              </Button>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={4}>
              {data[state].map(
                ({ id, image, Date, NameEN, NameTH, Type, Duration }) => (
                  <Box key={id} width={250}>
                    <Stack gap={1}>
                      <Box
                        sx={{
                          ":hover": {
                            "& img": {
                              opacity: 0.5,
                            },
                            "& .MuiButton-root": {
                              opacity: 1,
                            },
                          },
                          position: "relative",
                        }}
                      >
                        <img
                          src={image}
                          alt={id}
                          width="100%"
                          height={300}
                          style={{ borderRadius: 25, objectFit: "cover" }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => router.push({ pathname: id })}
                          sx={{
                            position: "absolute",
                            top: `calc((300px / 2) - (30px / 2))`,
                            left: `calc((250px / 2) - (150px / 2))`,
                            opacity: 0,
                            backgroundColor: "#D9D9D9",
                            color: (t) => t.palette.common.black,
                            borderRadius: 20,
                            width: 150,
                            height: 30,
                            ":hover": {
                              backgroundColor: "#D9D9D9",
                            },
                          }}
                        >
                          MORE INFO
                        </Button>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#F1AD3F",
                        }}
                      >
                        {dayjs(Date).format("DD MMM YYYY")}
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
                      <Stack direction="row" gap={1}>
                        <Chip
                          sx={{ backgroundColor: "#E1E1E7" }}
                          label={Type}
                        />
                        <Chip
                          sx={{ backgroundColor: "#E1E1E7" }}
                          label={Duration}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                )
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
