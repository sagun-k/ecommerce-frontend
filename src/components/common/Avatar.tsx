
type AvatarProps={
    name:string;
    size?:number;
}

const Avatar = ({ name, size = 40 }:AvatarProps) => {
  const colors = [
    "#6f42c1",
    "#fd7e14",
    "#198754",
    "#0d6efd",
    "#dc3545",
    "#20c997",
    "#ffc107",
    "#6610f2",
    "#d63384",
  ];

  function hashStringToNumber(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  const colorIndex = hashStringToNumber(name) % colors.length;
  const bgColor = colors[colorIndex];

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Render FontAwesome bot icon if name is Bot (case insensitive)
  if (name.toLowerCase() === "bot") {
    return (
      <div
        className="text-white d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.6,
          backgroundColor: "#6c757d",
          userSelect: "none",
        }}
        title="Bot"
        aria-label="Avatar for Bot"
      >
        <i className="fas fa-robot"></i>
      </div>
    );
  }

  return (
    <div
      className="text-white d-flex align-items-center justify-content-center rounded-circle"
      style={{
        width: size,
        height: size,
        fontSize: size / 2.2,
        fontWeight: "bold",
        backgroundColor: bgColor,
        userSelect: "none",
      }}
      title={name}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
