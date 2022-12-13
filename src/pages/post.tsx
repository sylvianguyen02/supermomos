import { Box, Grid, Typography } from "@mui/material";
import { MainLayout } from "../layouts/MainLayout";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect } from "react";
import axios from "../mock";

export interface Post {
  approve: boolean;
  banner: string;
  capacity: number;
  costPerPerson: number;
  date: string;
  description: string;
  location: string;
  name: string;
  privacy: string;
  tags: string[];
  time: string;
}

function formatNumber(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
const PostPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Post | null>(null);

  useEffect(() => {
    axios
      .get("/post/1")
      .then((data) => {
        setTimeout(() => {
          setData(data.data.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading || data === null) {
    return (
      <Typography variant="h4" component="h4" textAlign={"center"}>
        Loading...
      </Typography>
    );
  }
  return (
    <MainLayout>
      <Grid container>
        <Grid item sm={12} md={4}>
          <Grid rowSpacing={3} p={3}>
            <Typography variant="h4" component="h4">
              {data.name}
            </Typography>
          </Grid>
          <Grid
            rowSpacing={3}
            p={3}
            display="flex"
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={"10px"} alignItems="center">
              <DateRangeIcon />
              <Typography variant="h6" component="div">
                {data.date}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"10px"} alignItems="center">
              <DateRangeIcon />
              <Typography variant="h6" component="div">
                {data.time}
              </Typography>
            </Box>
          </Grid>
          <Grid
            rowSpacing={3}
            p={3}
            display={"flex"}
            gap={"10px"}
            alignItems="center"
          >
            <Typography display={"flex"} variant="subtitle1" component="div">
              <LocationOnIcon />
              {data.location}
            </Typography>
          </Grid>
          <Grid rowSpacing={3} p={3} display="flex" gap={"50px"}>
            <Box display={"flex"} gap={"10px"} alignItems="center">
              <PeopleIcon />
              <Typography variant="subtitle1" component="div">
                {formatNumber(data.capacity)}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"10px"} alignItems="center">
              <AttachMoneyIcon />
              <Typography variant="subtitle1" component="div">
                {formatNumber(data.costPerPerson)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={12} md={8}>
          <Box
            sx={{
              with: "100%",
              border: "1px dashed black",
              height: "300px",
              borderRadius: "0 64px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              overflow: "hidden",
            }}
            m={3}
          >
            <img
              style={{ width: "100%", objectFit: "cover" }}
              src="https://images.unsplash.com/photo-1589118949245-7d38baf380d6"
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
      <Grid p={5}>
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Typography>
      </Grid>
    </MainLayout>
  );
};
export default PostPage;
