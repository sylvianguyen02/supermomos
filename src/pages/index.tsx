import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  Autocomplete,
  Chip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MainLayout } from "../layouts/MainLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dynamic from "next/dynamic";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { height } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import ImagePopup from "../components/ImagePopup/ImagePopup";
import axios from "../mock";
const tags = ["abc", "abcd", "124"];
const Supermomos = () => {
  const methods = useForm({
    shouldUseNativeValidation: true,
    // defaultValues: {
    //   approve: false,
    //   banner: "",
    //   capacity: null,
    //   costPerPerson: null,
    //   date: null,
    //   description: "",
    //   location: "",
    //   name: "",
    //   privacy: null,
    //   tags: null,
    //   time: null,
    // },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const Editor = dynamic(() => import("../components/Editors/Ck"), {
    ssr: false,
  });
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const bannerUrl = methods.watch("banner");

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const data = methods.getValues();
    console.log(data);
    axios
      .post("/post", data)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          Router.push("post");
        }, 1000);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    methods.setValue("privacy", null);
    methods.setValue("banner", "");
  }, []);
  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Grid rowSpacing={3} p={3}>
                <TextField
                  label="Untitled Event"
                  {...(methods.register("name"),
                  {
                    required: true,
                    minLength: 1,
                  })}
                  variant="standard"
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                  rowSpacing={3}
                  p={3}
                  display={"flex"}
                  gap={"10px"}
                  flexWrap={"wrap"}
                >
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    {...methods.register("date")}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TimePicker
                    label="Time"
                    value={value}
                    onChange={handleChange}
                    {...methods.register("time")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid rowSpacing={3} p={3}>
                <TextField
                  label="Location"
                  {...methods.register("location", {
                    required: true,
                    minLength: 1,
                  })}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                rowSpacing={3}
                p={3}
                display={"flex"}
                gap={"10px"}
                flexWrap={"wrap"}
              >
                <TextField
                  label="Max capacity"
                  variant="outlined"
                  {...methods.register("capacity", { required: true, min: 1 })}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  type="number"
                  onChange={(event) => {
                    if ((event.target as any).value < 0) {
                      (event.target as any).value = null;
                      return;
                    }
                    methods.setValue("capacity", (event.target as any).value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Cost per person"
                  {...methods.register("costPerPerson", {
                    required: true,
                    min: 0,
                  })}
                  variant="outlined"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    min: 0,
                  }}
                  onChange={(event) => {
                    if ((event.target as any).value < 0) {
                      (event.target as any).value = null;
                      return;
                    }
                    methods.setValue(
                      "costPerPerson",
                      (event.target as any).value
                    );
                  }}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
              <Controller
                name="banner"
                control={methods.control}
                rules={{ required: true, min: 1, minLength: 1 }}
                render={({ field }) => (
                  <>
                    <ImagePopup
                      open={open}
                      setOpen={setOpen}
                      onChange={(value) => {
                        field.onChange(null);
                        setTimeout(() => {
                          field.onChange(value.img);
                        }, 100);
                        setOpen(false);
                      }}
                    />
                    <Box
                      sx={{
                        with: "100%",
                        border: "1px dashed black",
                        height: "100%",
                        minHeight: "300px",
                        borderRadius: "0 64px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        overflow: "hidden",
                      }}
                      m={3}
                      onClick={() => setOpen(true)}
                    >
                      <TextField
                        sx={{
                          width: 0,
                          height: 0,
                        }}
                        label="Untitled Event"
                        {...(methods.register("banner"),
                        {
                          required: true,
                          minLength: 1,
                        })}
                        value={bannerUrl ? bannerUrl : ""}
                        variant="standard"
                      />
                      {bannerUrl !== "" && (
                        <img
                          style={{ width: "100%", objectFit: "cover" }}
                          src={bannerUrl}
                          alt=""
                        />
                      )}
                      {bannerUrl === "" && <Button>Add a banner</Button>}
                    </Box>
                  </>
                )}
              />
            </Grid>
          </Grid>
          <Grid p={3} mt={3}>
            <Editor
              {...methods.register("description", {
                required: true,
                minLength: 10,
              })}
              value={""}
              onChange={(data) => {
                methods.setValue("description", data);
              }}
            />
          </Grid>
          <Grid>
            <Typography p={3} variant="h4" component="h4">
              Settings
            </Typography>
            <Grid p={3}>
              <FormControlLabel
                control={<Checkbox {...methods.register("approve")} />}
                label="I want to approve attendees"
              />
            </Grid>
            <Grid p={3}>
              <FormLabel id="demo-radio-buttons-group-label">Privacy</FormLabel>
              <RadioGroup
                onChange={(value) => {
                  methods.setValue(
                    "privacy",
                    (value.target as HTMLInputElement).value
                  );
                }}
                defaultValue="public"
                row
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="curated"
                  control={<Radio />}
                  label="Curated Audience"
                />
                <FormControlLabel
                  value="community"
                  control={<Radio />}
                  label="Community Only"
                />
              </RadioGroup>
            </Grid>
            <Grid p={3}>
              <FormLabel>Tag your socials</FormLabel>
              <Autocomplete
                {...methods.register("tags")}
                onChange={(value, newValue) => {
                  methods.setValue("tags", newValue);
                }}
                multiple
                id="tags-filled"
                options={tags.map((option) => option)}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" />
                )}
              />
            </Grid>
            <Grid p={3}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create social
              </LoadingButton>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </MainLayout>
  );
};

export default Supermomos;
