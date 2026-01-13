import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

interface IUserAvatarProps {
  src?: string;
  alt?: string;
}

const UserAvatar = (props: IUserAvatarProps) => {
  const { alt = 'User Avatar', src = '' } = props;
  const isCorrectSrc = !!src && src.length > 0;

  return (
    <Avatar variant="circular" className="h-20! w-20! bg-green-100! p-1" id="UserAvatar">
      {isCorrectSrc ? (
        <img
          className="h-full! w-full! object-cover"
          src={src}
          alt={alt}
          loading="lazy"
        />
      ) : (
        <ImageIcon color="success" className="h-full! w-full!" />
      )}
    </Avatar>
  );
};

export { UserAvatar };
