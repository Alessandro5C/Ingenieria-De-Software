import React from "react";

export default function WelcomePage() {
  React.useEffect(() => {
    console.log('Welcome page');
  }, []);
  return (
    <div>Welcome to Letskole </div>
  );
}