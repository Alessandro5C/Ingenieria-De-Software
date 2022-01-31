import Typography from "@mui/material/Typography";

function CopyrightSection(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Let Skole '} {new Date().getFullYear()} {'.'}
        </Typography>
    );
}

export default function Copyright(props: any) {
    return <CopyrightSection {...props} />
}