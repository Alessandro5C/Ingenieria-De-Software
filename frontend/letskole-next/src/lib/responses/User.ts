interface UserResponse {
  id?: string,
  displayedName?: string,
  email?: string,
  phoneNumber?: string | null,
  birthday?: string | null,
  school?: string | null,
}

export default UserResponse;