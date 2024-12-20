import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import GridViewIcon from "@mui/icons-material/GridView";

export default function MenuNavbar() {
  const pathName = usePathname();
  return (
    <Box
      sx={{
        marginTop: "-5px",
        width: "81vw",
        padding: "19px",
        color: "#784800",
        backgroundColor: "#FBF8F3",
        position: "fixed",
        left: "18.5rem",
        fontSize: "25px",
        display:"flex",
        alignItems:"center",
        borderBottom: "1.5px solid #EFDCBA",
        zIndex: 1000,
      }}
    >
      <GridViewIcon sx={{ marginLeft: "1rem", color: "#784800", marginRight:"15px" }} />
      {pathName.split("/").pop()}
    </Box>
  );
}
