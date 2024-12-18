"use client";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Skeleton,
	Box,
} from "@mui/material";
import React from "react";

export default function LoadingSkeleton({ rows = 5, columns = 7 }) {
	return (
		<TableContainer
			sx={{
				height: "54vh",
			}}
		>
			<Table size="small" stickyHeader>
				<TableHead>
					<TableRow sx={{ backgroundColor: "rgba(233, 233, 233, 0.2)" }}>
						{Array.from(new Array(columns)).map((_, index) => (
							<TableCell
								key={index}
								sx={{
									textAlign: index === 0 ? "center" : "left",
									color: "grey",
									fontWeight: 700,
									fontSize: "14px",
									padding: "8px",
								}}
							>
								<Skeleton variant="text" />
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.from(new Array(rows)).map((_, rowIndex) => (
						<TableRow key={rowIndex}>
							{Array.from(new Array(columns)).map((_, colIndex) => (
								<TableCell
									key={colIndex}
									sx={{
										textAlign: colIndex === 0 ? "center" : "left",
										padding: "18px",
									}}
								>
									<Skeleton variant="text" />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Box>
				<Skeleton
					sx={{
						marginLeft: "auto",
					}}
					variant="rectangular"
					width="30%"
					height={40}
				/>
			</Box>
		</TableContainer>
	);
}
