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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
        width: "10%",
      }}
    >
      {children}
    </TableCell>
  );
};

export default function UnitList() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredData, setFilteredData] = useState([
    { id: 1, serialNumber: 1, name: "Kg" },
    { id: 2, serialNumber: 2, name: "Meter" },
    { id: 3, serialNumber: 3, name: "Liter" },
    { id: 4, serialNumber: 4, name: "Gram" },
  ]);
  const [showLoader, setShowLoader] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.ChangeEvent<HTMLSelectElement>,
    newPage: number
  ) => {
    setPage(newPage);
    console.log("newPage", newPage);
  };

  useEffect(() => {
    setShowLoader(true);
    const debounceValue = setTimeout(() => {
      setUpdatedSearch(searchValue);
    }, 500);
    return () => clearTimeout(debounceValue);
  }, [searchValue]);

  useEffect(() => {
    setShowLoader(false);
  }, []);

  const handleEdit = (id: number, name: string) => {
    if (editingId === id) {
      // Save the edited value
      const updatedData = filteredData.map((item) =>
        item.id === id ? { ...item, name: editedName } : item
      );
      setFilteredData(updatedData);
      setEditingId(null); // Exit edit mode
    } else {
      // Enter edit mode
      setEditingId(id);
      setEditedName(name);
    }
  };

  const handleDelete = (id: number) => {
    const updatedData = filteredData.filter((item) => item.id !== id);
    setFilteredData(updatedData);
  };

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
          All Units List
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
            placeholder="Search Unit..."
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
                          width: "40%",
                        }}
                      >
                        Name
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
                          width: "50%",
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
                        <TableRow key={element?.id}>
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
                            {editingId === element.id ? (
                              <TextField
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            ) : (
                              element?.name || ""
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              padding: "8px",
                              color: "black",
                              fontWeight: 600,
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                handleEdit(element.id, element.name)
                              }
                            >
                              {editingId === element.id ? (
                                <CheckCircleIcon />
                              ) : (
                                <EditIcon />
                              )}
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(element.id)}
                            >
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
