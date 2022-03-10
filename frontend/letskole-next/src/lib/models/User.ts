interface UserResponse {
  id?: string,
  displayName?: string,
  email?: string,
  phoneNumber?: string | null,
  birthday?: string | null,
  school?: string | null,

  role?: string,
  password?: string
}

export default UserResponse;
