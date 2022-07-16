import React from "react";
import { useNotificationListStyles } from "../../styles";
import { defaultNotifications } from "../../data";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import FollowButton from "../shared/FollowButton";
import useOutsideClick  from "@rooks/use-outside-click";


function NotificationList({handleHideList}) {
  const listContainerRef=React.useRef();
  const classes=useNotificationListStyles();
  useOutsideClick(listContainerRef, handleHideList);

  return(
    <Grid ref={listContainerRef} className={classes.listContainer} container>
      {defaultNotifications.map(notifications => {
        const isLike = notifications.type === 'like';
        const isFollow = notifications.type ==='follow';

        return (
          <Grid key={notifications.id} item className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar src={notifications.user.profile_image} alt="User avatar" />
              </div>
              <div className={classes.nameWrapper}>
                <Link to={`${notifications.user.username}`}>
                  <Typography variant="body1">
                    {notifications.user.username}
                  </Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" className={classes.typography}>
                  {isLike && `likes your photo. 4d`}
                  {isFollow && `started following you. 5d`}
                </Typography>
              </div>
            </div>
            <div>
              {isLike && (
                <Link to={`/p/${notifications.post.id}`}>
                  <Avatar src={notifications.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton />}
            </div>
          </Grid>
        )
      })}
    </Grid>
  );
}

export default NotificationList;
