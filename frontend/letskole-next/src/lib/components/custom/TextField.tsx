import * as React from "react";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";

interface Props<TData> extends OutlinedTextFieldProps {
  editable: boolean;
  customId: keyof TData;
  obj: {
    get: TData;
    set: React.Dispatch<React.SetStateAction<TData>>;
  }
}

function CustomTextField<TData>({ editable, customId, obj, ...props }: Props<TData>) {
  return (
    <TextField
      {...props}
      disabled={!editable}
      id={customId as string}
      name={customId as string}
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={obj.get[customId] || ""}
      onChange={({ target }) => {
        obj.set({ ...obj.get, [target.name]: target.value });
      }}
    />
  );
}

export default CustomTextField;