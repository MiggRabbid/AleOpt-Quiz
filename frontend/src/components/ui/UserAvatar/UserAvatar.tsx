import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { getAvatarPaths } from '@/lib/getAvatarPaths';
import Image from 'next/image';

interface IUserAvatarProps {
  src?: string;
  alt?: string;
}

const UserAvatar = (props: IUserAvatarProps) => {
  const { alt = 'User Avatar', src = '' } = props;
  const isCorrectSrc = !!src && src.length > 0;

  // const avatars = getAvatarPaths();
  // console.log('UserAvatar avatars -', avatars);
  return (
    <Avatar variant="circular" className="h-20! w-20! bg-green-100! p-1" id="UserAvatar">
      {isCorrectSrc ? (
        <Image className="object-cover" src={src} alt={alt} fill />
      ) : (
        <ImageIcon color="success" className="h-full! w-full!" />
      )}
    </Avatar>
  );
};

export { UserAvatar };
