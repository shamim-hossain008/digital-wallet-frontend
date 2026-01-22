/* eslint-disable @typescript-eslint/no-explicit-any */

function ProfileCompletion({ profile }: { profile: any }) {
  const hasPhone = Boolean(profile?.name);
  const hasPicture = Boolean(profile?.picture);

  let percent = 50;

  if (hasPhone && hasPicture) {
    percent = 100;
  } else if (hasPhone || hasPicture) {
    percent = 80;
  }

  return (
    <div className="w-full text-center">
      <p className="text-xs text-muted-foreground">Profile Completion</p>
      <div className="h-2 bg-muted rounded">
        <div
          className="h-2 bg-primary rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs mt-1">{percent}% complete</p>
    </div>
  );
}

export default ProfileCompletion;
