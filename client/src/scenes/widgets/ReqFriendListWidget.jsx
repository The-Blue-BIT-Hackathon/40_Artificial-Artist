import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {setReqFriends}  from "state";



const ReqFriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const reqFriends = useSelector((state) => state.user.reqFriends);
  const friends = useSelector((state) => state.user.friends)
  const getReqFriends = async () => {
    const UserResponse = await fetch(
      `https://backend-7pk9.onrender.com/users/${userId}/request`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await UserResponse.json();
    dispatch(setReqFriends({ reqFriends: data }));
    console.log(data);
  };

  useEffect(() => {
    getReqFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Request List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {reqFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ReqFriendListWidget;
