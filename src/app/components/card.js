import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard() {
    // Example data
    const data = {
        title: "Total Success",
        value: 250,
    };

    return (
        <Card variant="outlined" sx={{
            width: "9rem", height: "5rem", padding: 2, backgroundColor: "#FFFFFF", boxShadow: "0px 0px 10px #F9E0B4",
            borderRadius: "8px",
        }}>
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 16, color: "#333333", fontFamily:"Montserrat", fontWeight:"600" }}
                >
                    {data.title}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "text.primary", fontWeight: "bold", color: "#784800",fontFamily:"Montserrat" }}
                >
                    {data.value}
                </Typography>
            </CardContent>
        </Card>
    );
}
