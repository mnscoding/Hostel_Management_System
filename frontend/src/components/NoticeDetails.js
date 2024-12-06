/*import { useNoticesContext } from "../hooks/useNoticesContext";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete icon

const NoticeDetails = ({ notice }) => {
  const { dispatch } = useNoticesContext();

  const handleClick = async () => {
    const response = await fetch("/api/notices/" + notice._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTICE", payload: json });
    }
  };

  if (!notice) return null;

  const formattedCreatedAt = new Date(notice.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "visible",
        position: "relative", // Allow absolute positioning of the icon
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {notice.title}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {notice.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
        <IconButton
          onClick={handleClick}
          sx={{
            position: "absolute", // Position the icon absolutely
            top: 8, // Adjust as needed
            right: 8, // Adjust as needed
            backgroundColor: "transparent", // Make background transparent
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect (optional)
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default NoticeDetails;*/
import { useNoticesContext } from "../hooks/useNoticesContext";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon

const NoticeDetails = ({ notice, onEdit, onDeleteSuccess, canEditDelete }) => {
  const { dispatch } = useNoticesContext();

  const handleDelete = async () => {
    const response = await fetch("/api/notices/" + notice._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTICE", payload: json });
      onDeleteSuccess(); // Call the callback to refresh notices
    }
  };

  if (!notice) return null;

  const formattedCreatedAt = new Date(notice.createdAt).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "20px auto",
        borderRadius: 2,
        //boxShadow: 3,
        overflow: "visible",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {notice.title}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          paragraph
          sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        >
          {notice.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" align="right">
          {formattedCreatedAt}
        </Typography>
        {canEditDelete && (
          <>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", top: 8, right: 40 }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => onEdit(notice)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NoticeDetails;
