"use client";

import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { useRouter } from "next/navigation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CustomHeaderCell = ({ children }) => {
  const theme = useTheme();
  return (
    <TableCell
      sx={{
        textAlign: "center",
        color: theme.palette.common.black,
        backgroundColor: theme.palette.grey[300],
        fontWeight: 700,
        fontSize: "14px",
        padding: "8px",
        borderTop: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      {children}
    </TableCell>
  );
};

export default function AllProductsPage() {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const [searchValue, setSearchValue] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const [anchorElForListMenu, setAnchorElForListMenu] = useState(null);
  const openCalendar = Boolean(anchorElCalendar);
  const openListMenu = Boolean(anchorElForListMenu);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [careStatus, setCareStatus] = useState("");
  const [policy, setPolicy] = useState("");
  const [caseType, setCaseType] = useState("");
  const [openRow, setOpenRow] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  // Menu for each row
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, typeOfAction) => {
    if (selectedRow) {
      console.log("Action:", typeOfAction);
      console.log("Selected Row:", selectedRow);
      // if (typeOfAction === "Open Request") {
      // 	handleOpenUserDetails(selectedRow?.id);
      // } else {
      // 	if (selectedRow?.status === "closed") {
      // 		setOpenToast(true);
      // 		setMessage("This request is already closed !");
      // 	} else {
      // 		setOpenToast(true);
      // 		setMessage("You are not authorized to perform this action!");
      // 		updateRequestStatus({
      // 			requestId: selectedRow?.id,
      // 		});
      // 	}
      // }
    }
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("newPage", newPage);
  };

  const handleToggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  //searching by debouncing
  // useEffect(() => {
  // 	setShowLoader(true);
  // 	let debounceValue = setTimeout(() => {
  // 		setUpdatedSearch(searchValue);
  // 	}, 500);
  // 	return () => clearTimeout(debounceValue);
  // }, [searchValue]);

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{
          xs: 12,
          md: 12,
          lg: 12,
          xl: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search Product..."
              InputProps={{
                sx: {
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: 700,
                },
                startAdornment: (
                  <SearchRoundedIcon
                    sx={{
                      color: "rgba(0,0,0,0.4)",
                    }}
                  />
                ),
              }}
            />
          </Box>
          <Box>Filters</Box>
        </Box>
        {/* <Grid
								container
								spacing={0}
								sx={{
									padding: "10px",
									mt: 1,
								}}
							>
								<Grid
									item
									xs={4}
									md={4}
									lg={2}
									sx={{
										paddingRight: "10px",
									}}
								>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
										}}
									>
										<Box>
											<InputLabel
												sx={{
													color: theme.palette.common.darkGrey,
													fontSize: "14px",
												}}
											>
												Care Status
											</InputLabel>
											<Select
												size="small"
												value={careStatus}
												onChange={handleCareStatusChange}
												placeholder="Select Status"
												sx={{
													color: "black",
													fontSize: "14px",
													fontWeight: "650",
													backgroundColor: "rgba(242, 243, 243, 1)",
													border: "transparent",
													borderRadius: "8px",
													mt: 0.5,
													maxHeight: "30px",
												}}
												MenuProps={{
													PaperProps: {
														style: {
															maxHeight: 200,
															overflowY: "auto",
														},
													},
												}}
												fullWidth
												variant="outlined"
												displayEmpty
											>
												<MenuItem value="">
													<Typography
														sx={{
															color: "rgba(0, 0, 0, 0.4)",
															fontWeight: 600,
														}}
													>
														Select Status
													</Typography>
												</MenuItem>
												<MenuItem value="status1">Status 1</MenuItem>
												<MenuItem value="status2">Status 2</MenuItem>
											</Select>
										</Box>
									</Box>
								</Grid>
								<Grid
									item
									xs={4}
									md={4}
									lg={3}
									sx={{
										paddingRight: "20px",
									}}
								>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: "10px",
										}}
									>
										<Box>
											<InputLabel
												sx={{
													color: theme.palette.common.darkGrey,
													fontSize: "14px",
												}}
											>
												Policy
											</InputLabel>
											<Select
												size="small"
												value={policy}
												onChange={handlePolicyChange}
												placeholder="Select Policy"
												sx={{
													color: "black",
													fontSize: "14px",
													fontWeight: "650",
													backgroundColor: "rgba(242, 243, 243, 1)",
													border: "transparent",
													borderRadius: "8px",
													mt: 0.5,
													maxHeight: "30px",
												}}
												MenuProps={{
													PaperProps: {
														style: {
															maxHeight: 200,
															overflowY: "auto",
														},
													},
												}}
												fullWidth
												variant="outlined"
												displayEmpty
											>
												<MenuItem value="">
													<Typography
														sx={{
															color: "rgba(0, 0, 0, 0.4)",
															fontWeight: 600,
														}}
													>
														Select Policy
													</Typography>
												</MenuItem>
												<MenuItem value="policy1">Policy 1</MenuItem>
												<MenuItem value="policy2">Policy 2</MenuItem>
											</Select>
										</Box>
									</Box>
								</Grid>
								<Grid
									item
									xs={4}
									md={4}
									lg={3}
									sx={{
										paddingRight: "15px",
									}}
								>
									<Box>
										<InputLabel
											sx={{
												color: theme.palette.common.darkGrey,
												fontSize: "14px",
											}}
										>
											Case Type
										</InputLabel>
										<Select
											size="small"
											value={caseType}
											onChange={handleCaseTypeChange}
											placeholder="Select Type"
											sx={{
												color: "black",
												fontSize: "14px",
												fontWeight: "650",
												backgroundColor: "rgba(242, 243, 243, 1)",
												border: "transparent",
												borderRadius: "8px",
												minWidth: "150px",
												mt: 0.5,
												maxHeight: "30px",
											}}
											MenuProps={{
												PaperProps: {
													style: {
														maxHeight: 200,
														overflowY: "auto",
													},
												},
											}}
											fullWidth
											variant="outlined"
											displayEmpty
										>
											<MenuItem value="">
												<Typography
													sx={{ color: "rgba(0, 0, 0, 0.4)", fontWeight: 600 }}
												>
													Case Type
												</Typography>
											</MenuItem>
											<MenuItem value="case1">Case 1</MenuItem>
											<MenuItem value="case2">Case 2</MenuItem>
										</Select>
									</Box>
								</Grid>
								<Grid
									item
									xs={6}
									md={6}
									lg={3}
									sx={{
										paddingRight: "5px",
									}}
								>
									<Box>
										<InputLabel
											sx={{
												color: theme.palette.common.darkGrey,
												fontSize: "14px",
											}}
										>
											Date Range :
										</InputLabel>
										<Box
											sx={{
												width: "100%",
											}}
										>
											<Button
												fullWidth={true}
												variant="text"
												sx={{
													padding: "6px 10px",
													color: theme.palette.common.darkGrey,
													fontSize: "14px",
													fontWeight: "650",
													maxHeight: "30px",
													backgroundColor: "rgba(242, 243, 243, 1)",
													border: `1px solid rgba(0, 0, 0, 0.2)`,
													borderRadius: "8px",
													minWidth: "200px",
													mt: 0.5,
												}}
												onClick={handleClickCalendar}
												endIcon={<CalendarMonthIcon />}
											>
												{date?.from && date?.to ? (
													<>{`${dayjs(date?.from).format(
														"DD MMM YY"
													)} - ${dayjs(date?.to).format("DD MMM YY")}`}</>
												) : (
													`StartDate-EndDate`
												)}
											</Button>

											<Menu
												id="long-menu"
												MenuListProps={{
													"aria-labelledby": "long-button",
												}}
												anchorEl={anchorElCalendar}
												open={openCalendar}
												onClose={handleCloseCalendar}
											>
												<DateRangePicker
													onChange={(item) => {
														console.log("Item Selection", item.selection);
														setDate({
															from: item.selection.startDate,
															to: item.selection.endDate,
														});
														handleCloseCalendar();
													}}
													rangeColors={["#053C61"]}
													dragSelectionEnabled={true}
													showSelectionPreview={true}
													moveRangeOnFirstSelection={false}
													months={1}
													maxDate={new Date()}
													ranges={[
														{
															startDate: date.from,
															endDate: date?.to,
															key: "selection",
														},
													]}
													direction="vertical"
												/>
											</Menu>
										</Box>
									</Box>
								</Grid>
								{isSmallScreen && (
									<Grid
										item
										xs={6}
										sm={6}
										md={6}
										lg={1}
										sx={{
											paddingRight: "20px",
											display: "flex",
											justifyContent: "flex-end",
											alignItems: "center",
											mt: 1,
											paddingTop: "15px",
											paddingRight: "20px",
										}}
									>
										<Box>
											<IconButton
												size="large"
												onClick={() => {
													handleModalOpen();
												}}
											>
												<Badge badgeContent={100} color="primary">
													<CircleNotificationsIcon fontSize="45px" />
												</Badge>
											</IconButton>
										</Box>
									</Grid>
								)}
							</Grid> */}
        <Box
          sx={{
            mt: 3,
          }}
        >
          {showLoader ? (
            <LoadingSkeleton />
          ) : (
            <>
              <TableContainer
                sx={{
                  maxHeight: "60vh",
                  overflow: "auto",
                }}
              >
                <Table
                  component={Paper}
                  size="small"
                  stickyHeader
                  sx={{ zIndex: -1 }}
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "black" }}>
                      <CustomHeaderCell>S.No.</CustomHeaderCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                          color: theme.palette.common.black,
                          backgroundColor: theme.palette.grey[300],
                          fontWeight: 700,
                          fontSize: "14px",
                          padding: "8px",
                          borderTop: `1px solid ${theme.palette.grey[300]}`,
                        }}
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: theme.palette.common.black,
                          backgroundColor: theme.palette.grey[300],
                          fontWeight: 700,
                          fontSize: "14px",
                          padding: "8px",
                          borderTop: `1px solid ${theme.palette.grey[300]}`,
                        }}
                      >
                        Product Type
                      </TableCell>
                      <CustomHeaderCell>Category</CustomHeaderCell>
                      <CustomHeaderCell>Quantity</CustomHeaderCell>

                      {!isSmallScreen && (
                        <>
                          <CustomHeaderCell>Code</CustomHeaderCell>
                          <CustomHeaderCell>Cost</CustomHeaderCell>
                          <CustomHeaderCell>Price</CustomHeaderCell>
                          <CustomHeaderCell>Unit</CustomHeaderCell>
                        </>
                      )}
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: theme.palette.common.black,
                          backgroundColor: theme.palette.grey[300],
                          fontWeight: 700,
                          fontSize: "14px",
                          padding: "8px",
                          borderTop: `1px solid ${theme.palette.grey[300]}`,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {showLoader ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          sx={{ textAlign: "center", height: "40vh" }}
                        >
                          <Box>
                            <CircularProgress size={40} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : filteredData?.length > 0 ? (
                      filteredData.map((element, index) => {
                        return (
                          <React.Fragment key={element?.serialNumber}>
                            <TableRow>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "8px",
                                  color: "black",
                                  fontWeight: 600,
                                }}
                              >
                                {index + 1 + page * rowsPerPage}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "left",
                                  padding: "8px",
                                  color: "black",
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                {`${element?.name || ""}`}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "8px",
                                  color: "black",
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                <Chip
                                  size="small"
                                  color={
                                    element?.status === "closed"
                                      ? "default"
                                      : element?.status === "active"
                                        ? "info"
                                        : "primary"
                                  }
                                  label={
                                    element?.status?.charAt(0).toUpperCase() +
                                    element?.status?.slice(1).toUpperCase()
                                  }
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    "&:hover": {
                                      cursor: "pointer",
                                    },
                                    textTransform: "capitalize",
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "8px",
                                  color: "black",
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                {`${element?.age || ""}Y, ${
                                  element?.gender || ""
                                }`}
                              </TableCell>
                              {!isSmallScreen && (
                                <>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "8px",
                                      color: "black",
                                      fontWeight: 600,
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {element?.memberId || "--"}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "8px",
                                      color: "black",
                                      fontWeight: 600,
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {element?.claimNumber || "--"}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "8px",
                                      color: "black",
                                      fontWeight: 500,
                                      textTransform: "capitalize",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {element?.subDate !== undefined
                                      ? element?.subDate
                                      : "0"}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "8px",
                                      color: "black",
                                      fontWeight: 500,
                                      textTransform: "capitalize",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {element?.claimAmount !== undefined
                                      ? element?.claimAmount
                                      : "0"}
                                  </TableCell>
                                </>
                              )}
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "8px",
                                  color: "black",
                                  fontWeight: 600,
                                }}
                              >
                                <IconButton
                                  onClick={(e) => handleOpenMenu(e, element)}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  elevation={0}
                                  anchorEl={anchorEl}
                                  open={openMenu}
                                  onClose={handleCloseMenu}
                                  onClick={handleCloseMenu}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <MenuItem
                                    onClick={() =>
                                      handleMenuItemClick(
                                        element,
                                        "Open Request"
                                      )
                                    }
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: theme.palette.common.black,
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      Open Request
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleMenuItemClick(
                                        element,
                                        "Close Request"
                                      )
                                    }
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: theme.palette.common.black,
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      Close Request
                                    </Typography>
                                  </MenuItem>
                                </Menu>

                                {isSmallScreen && (
                                  <IconButton
                                    onClick={() => handleToggleRow(element?.id)}
                                  >
                                    {openRow === element?.id ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                            {isSmallScreen && (
                              <TableRow>
                                <TableCell
                                  style={{
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                  }}
                                  colSpan={6}
                                >
                                  <Collapse
                                    in={openRow === element?.id}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <Box
                                      margin={1}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 2,
                                          width: "100%",
                                          borderBottom: "1px solid black",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                              color:
                                                theme.palette.common.darkGrey,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            Claim Amount(₹)
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "600",
                                              color: theme.palette.common.black,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {element?.claimAmount !== undefined
                                              ? element?.claimAmount
                                              : "0"}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 2,
                                          width: "100%",
                                          borderBottom: "1px solid black",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                              color:
                                                theme.palette.common.darkGrey,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            Claim Number
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "600",
                                              color: theme.palette.common.black,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {element?.claimNumber}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 2,
                                          width: "100%",
                                          borderBottom: "1px solid black",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                              color:
                                                theme.palette.common.darkGrey,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            Member Id
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "600",
                                              color: theme.palette.common.black,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {element?.memberId || "--"}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 2,
                                          width: "100%",
                                          borderBottom: "1px solid black",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                              color:
                                                theme.palette.common.darkGrey,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            Policy Number
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "600",
                                              color: theme.palette.common.black,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {element?.policyNumber || "--"}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ textAlign: "center", height: "40vh" }}
                        >
                          No data found
                        </TableCell>
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
}
