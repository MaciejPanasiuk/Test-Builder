import Tooltip from "@mui/material/Tooltip/Tooltip";
import { ButtonEvent, titleProps } from "../../../Interfaces/types";
import "./Title.scss";
import IconButton from "@mui/material/IconButton/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function Title({ title, onTitleUpdate }: titleProps) {
  const handleTitleChange = (value: string) => {
    onTitleUpdate((prevTitle) => {
      return { ...prevTitle, titleText: value };
    });
  };
  const handleConfirmClick = (event: ButtonEvent) => {
    event.preventDefault();
    onTitleUpdate((prevTitle) => {
      return { ...prevTitle, isActive: false };
    });
  };
  const handleEditClick = (event: ButtonEvent) => {
    event.preventDefault();
    onTitleUpdate((prevTitle) => {
      return { ...prevTitle, isActive: true };
    });
  };

  return (
    <div className="titleContainer">
      {title.isActive ? (
        <>
          <TextareaAutosize 
            className="textAreaTitle"
            value={title.titleText}
            onChange={(e) => handleTitleChange(e.target.value)}
          ></TextareaAutosize>
          <Tooltip title="Confirm Title" arrow>
            <IconButton
              className="editButton"
              color="success"
              size="large"
              onClick={(e) => handleConfirmClick(e)}
            >
              <CheckRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <h1 className="titleText">{title.titleText}</h1>
          <Tooltip title="Edit Title" arrow>
            <IconButton
              className="editButton"
              color="success"
              size="large"
              onClick={(e) => handleEditClick(e)}
            >
              <EditRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
}
