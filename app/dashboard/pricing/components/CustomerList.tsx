"use client";
import ChikitsaSpinner from "@/app/components/Loader/LoaderSpinner";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const CustomHeaderCell = ({ children }: { children: string }) => {
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
      }}
    >
      {children}
    </TableCell>
  );
};

export default function CustomerList() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState([
    {
      serialNumber: 1,
      name: "Single Product",
      gender: "Male",
      balance: 400,
      address: "New Master Colony",
      phoneNumber: "7742736286",
    },
  ]);
  const [showLoader, setShowLoader] = useState(true); // Ensure loader is true initially

  // Handle change in rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  // Handle page change
  const handleChangePage = (
    event: React.ChangeEvent<HTMLSelectElement>,
    newPage: number
  ) => {
    setPage(newPage);
    console.log("newPage", newPage);
  };

  // Debounced searching effect
  useEffect(() => {
    setShowLoader(true); // Show loader while updating search
    const debounceValue = setTimeout(() => {
      setUpdatedSearch(searchValue); // Update search after debounce
    }, 500);
    return () => clearTimeout(debounceValue); // Clean up timeout on searchValue change
  }, [searchValue]);

  useEffect(() => {
    setShowLoader(false); // Set loader to false after component mounts on client side
  }, []);

  return (
    <Box>
      <Box
        sx={{
          borderBottom: `2px solid ${theme.palette.grey[600]}`,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              lg: "22px",
            },
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Customers List
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            p: 1,
          }}
        >
          <TextField
            variant="outlined"
            size="medium"
            fullWidth
            autoComplete="off"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search By Name..."
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
      </Box>

      <Box>
        <Box>
          {showLoader ? (
            <ChikitsaSpinner />
          ) : (
            <>
              <TableContainer
                sx={{
                  maxHeight: "60vh",
                  overflow: "auto",
                }}
              >
                <Table size="small" stickyHeader>
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
                        Name
                      </TableCell>
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
                        Gender
                      </TableCell>
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
                        Mobile No.
                      </TableCell>
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
                        Address
                      </TableCell>
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
                        Balance
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
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showLoader ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          sx={{ textAlign: "center", height: "40vh" }}
                        >
                          <CircularProgress size={40} />
                        </TableCell>
                      </TableRow>
                    ) : filteredData?.length > 0 ? (
                      filteredData.map((element, index) => (
                        <TableRow key={element?.serialNumber}>
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
                            {element?.name || ""}
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
                            {element?.gender || ""}
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
                            {element?.phoneNumber || ""}
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
                            {element?.address || ""}
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
                            {element?.balance || ""}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              padding: "8px",
                              color: "black",
                              fontWeight: 600,
                            }}
                          >
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ textAlign: "center", height: "40vh" }}
                        >
                          No data found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Uncomment and complete pagination if needed */}
              {/* <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
