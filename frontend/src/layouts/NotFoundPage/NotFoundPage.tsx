import { SideFull } from '@/shared/ui/layouts';
import { Box } from '@mui/material';
import ClientWrapper from './ui/ClientWrapper';
import { BtnRedirect } from './ui/BtnRedirect';

export default function NotFoundPage() {
  return (
    <SideFull
      id="NotFoundPage"
      otherClass="relative flex h-full w-full grow items-center-safe justify-center-safe"
      type="login"
    >
      <Box className="shadow-glass border-glass h-fit w-fit overflow-hidden rounded-2xl border backdrop-blur-sm">
        <Box className="bg-glass h-full w-full">
          <ClientWrapper>
            <BtnRedirect />
          </ClientWrapper>
        </Box>
      </Box>
    </SideFull>
  );
}
