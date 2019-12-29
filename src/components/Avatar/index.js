export const Avatar = ({ src, size }) => (
  <img
    style={{
      height: size,
      width: size,
      objectFit: 'cover',
      overflow: 'hidden',
      borderRadius: '50%'
    }}
    src={src}
  />
)
