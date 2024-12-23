"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function OutlinedCard() {
    const dashboardData = useSelector((state) => state?.appUserReducer?.dashboardData);

    const totalCreditAmount = dashboardData?.data?.[0]?.totalCreditAmount || 0;
    const totalDebitAmount = dashboardData?.data?.[0]?.totalDebitAmount || 0;
    const totalFailAmount = dashboardData?.data?.[0]?.totalFailAmount || 0;
    const totalFailCount = dashboardData?.data?.[0]?.totalFailCount || 0;
    const totalPendingAmount = dashboardData?.data?.[0]?.totalPendingAmount || 0;
    const totalPendingCount = dashboardData?.data?.[0]?.totalPendingCount || 0;
    const totalSuccessAmount = dashboardData?.data?.[0]?.totalSuccessAmount || 0;
    const totalSuccessCount = dashboardData?.data?.[0]?.totalSuccessCount || 0;

    const groupedMetrics = [
        {
            title1: "Total Credit Amount",
            value1: totalCreditAmount,
            title2: "Total Debit Amount",
            value2: totalDebitAmount,
        },
        {
            title1: "Total Fail Amount",
            value1: totalFailAmount,
            title2: "Total Fail Count",
            value2: totalFailCount,
        },
        {
            title1: "Total Pending Amount",
            value1: totalPendingAmount,
            title2: "Total Pending Count",
            value2: totalPendingCount,
        },
        {
            title1: "Total Success Amount",
            value1: totalSuccessAmount,
            title2: "Total Success Count",
            value2: totalSuccessCount,
        },
    ];

    return (
        <div style={{ display: "flex", gap: "3.8rem" }}>
            {groupedMetrics.map((group, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        width: "14.3rem",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 0px 10px #F9E0B4",
                        borderRadius: "8px",
                    }}
                >
                    <CardContent>
                        <Typography
                            gutterBottom
                            sx={{
                                fontSize: 18,
                                color: "#333333",
                                fontFamily: "Montserrat",
                                fontWeight: "700",
                            }}
                        >
                            {group.title1}: <span style={{color:"#784800"}}>{group.value1}</span>
                        </Typography>

                        <Typography
                            gutterBottom
                            sx={{
                                fontSize: 18,
                                color: "#333333",
                                fontFamily: "Montserrat",
                                fontWeight: "700",
                            }}
                        >
                            {group.title2}: <span style={{color:"#784800"}}>{group.value2}</span>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
