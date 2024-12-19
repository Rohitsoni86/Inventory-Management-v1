"use client";
import ChikitsaSpinner from "@/app/components/Loader/LoaderSpinner";
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
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
      }}
    >
      {children}
    </TableCell>
  );
};

export default function CategoryList() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([
    { id: 1, name: "Single Product" },
    { id: 2, name: "Bundle Product" },
    { id: 3, name: "Multiple Items" },
  ]);
  const [showLoader, setShowLoader] = useState(true);
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which row is being edited
  const [editValue, setEditValue] = useState<string>("");

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
  };

  // Handle edit button click
  const handleEdit = (id: number, currentName: string) => {
    if (isEditing === id) {
      // Save the edit
      const updatedData = filteredData.map((category) =>
        category.id === id ? { ...category, name: editValue } : category
      );
      setFilteredData(updatedData);
      setIsEditing(null); // Disable edit mode
    } else {
      // Enable editing for this row
      setIsEditing(id);
      setEditValue(currentName);
    }
  };

  // Handle delete button click
  const handleDelete = (id: number) => {
    const updatedData = filteredData.filter((category) => category.id !== id);
    setFilteredData(updatedData);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: `2px solid ${theme.palette.grey[600]}`, p: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: "18px", lg: "22px" },
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          All Categories List
        </Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Category..."
          InputProps={{
            sx: {
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
            },
            startAdornment: (
              <SearchRoundedIcon sx={{ color: "rgba(0,0,0,0.4)" }} />
            ),
          }}
        />
      </Box>

      <Box>
        <Box>
          {showLoader ? (
            <ChikitsaSpinner />
          ) : (
            <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
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
                  {filteredData.length > 0 ? (
                    filteredData.map((category, index) => (
                      <TableRow key={category.id}>
                        <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell sx={{ textAlign: "left", padding: "8px" }}>
                          {isEditing === category.id ? (
                            <TextField
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          ) : (
                            category.name
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                          <IconButton
                            onClick={() =>
                              handleEdit(category.id, category.name)
                            }
                          >
                            {isEditing === category.id ? (
                              <CheckCircleIcon />
                            ) : (
                              <EditIcon />
                            )}
                          </IconButton>
                          <IconButton onClick={() => handleDelete(category.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        sx={{ textAlign: "center", height: "40vh" }}
                      >
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
