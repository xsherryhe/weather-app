export default function degreesToDirection(degrees) {
  const adjusted = degrees - 22.5;
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][
    adjusted > 0 && adjusted < 315 ? Math.ceil(adjusted / 45) : 0
  ];
}
