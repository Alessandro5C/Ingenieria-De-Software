import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

export default function WelcomePage() {
  React.useEffect(() => {
    console.log('Welcome page');
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to="/dashboard/user/details">
        <CardMedia
        component="img"
        height="140"
        image="/images/cards/newsfourbg.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here, you can see, edit or delete your account details.
          </Typography>
        </CardContent>
        
      </CardActionArea>
    </Card>
  );
}