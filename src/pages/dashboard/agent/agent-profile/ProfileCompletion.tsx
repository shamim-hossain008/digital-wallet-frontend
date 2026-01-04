/* eslint-disable @typescript-eslint/no-explicit-any */

function ProfileCompletion({ profile }: { profile: any }) {
  const fields = [profile.name, profile.phone, profile.picture];

  const completed = fields.filter(Boolean).length;
  const rawPercent = (completed / fields.length) * 100
  const percent = Math.min(100,Math.max(0,Math.round(rawPercent)))

  return (
    <div className="w-full text-center">
      <p className="text-xs text-muted-foreground">Profile Completion</p>
      <div className="h-2 bg-muted rounded">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs mt-1">{percent}% complete</p>
    </div>
  );
}

export default ProfileCompletion;
