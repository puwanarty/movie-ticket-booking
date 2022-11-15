import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const isTH = router.locale === "th";
  return (
    <AppBar position="sticky" sx={{ bgcolor: (t) => t.palette.common.black }}>
      <Toolbar>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              MY CinePlex
            </Typography>
            <Box
              component="div"
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() =>
                router.push(router.asPath, router.asPath, {
                  locale: isTH ? "en" : "th",
                })
              }
            >
              <Typography>{isTH ? "TH" : "EN"}</Typography>
            </Box>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
