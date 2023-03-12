import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography, useTheme,Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setReqFriends } from "state";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function refreshPage() {
  window.location.reload(false);
}

const Friend = ({ friendId, name, subtitle, userPicturePath, fOr }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loggedinUser = useSelector((state) => state.user._id);
  const reqFriends = useSelector((state) => state.user.reqFriends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isLive = user.isLive;

  const patchFriend = async () => {
    const response = await fetch(
      `https://backend-7pk9.onrender.com/users/${_id}/${friendId}/request`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data)
    // dispatch(setFriends({ friends: data }));
    dispatch(setReqFriends({ reqFriends: data }));
    // refreshPage();
  };
  const patchNewFriend = async () => {
    const response = await fetch(
      `https://backend-7pk9.onrender.com/users/${_id}/${friendId}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // refreshPage();
    dispatch(setFriends({ friends: data }));
  };
  const patchFriendReq = async () => {
    const response = await fetch(
      `https://backend-7pk9.onrender.com/users/${_id}/${friendId}/request/add`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // refreshPage();
    // dispatch(setFriends({ friends: data }));
  };

  const patchFriendReqRem = async () => {
    const response = await fetch(
      `https://backend-7pk9.onrender.com/users/${_id}/${friendId}/request/remove`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // refreshPage();
    // dispatch(setFriends({ friends: data }));
  };

  function viewLive () {
    navigate('/watchlive');
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
         
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
        <Box>
        {isFriend && isLive && <Button variant="contained" onClick={viewLive}>Enter live</Button>}
        </Box>
      </FlexBetween>
      {friendId!== loggedinUser && fOr == "friendList" ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined
              sx={{ color: primaryDark }}
              onClick={() => patchNewFriend()}
            />
          ) : ( 
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
         friendId!== loggedinUser &&
        <div>
          <CloseIcon
            onClick={() => patchFriendReqRem()}
          />
          <DoneIcon
            onClick={() => patchFriendReq()}
          />
        </div>
        
      )}
    </FlexBetween>
  );
};

export default Friend;
