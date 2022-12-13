import { Box } from "@mui/material";
import Link from "next/link";

export const MainHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0",
        px: "10px",
      }}
    >
      <Link href={"/"}>
        <img src="logo.png" />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          href="/1"
        >
          Blog
        </Link>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          href="/2"
        >
          Socials
        </Link>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          href="/3"
        >
          Past Socials
        </Link>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          href="/4"
        >
          Clubs
        </Link>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          href="/5"
        >
          Contacts
        </Link>
      </Box>
    </Box>
  );
};
