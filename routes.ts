export default {
  root: '/',
  login: '/login',
  signup: '/signup',
  option: (optionId: string): string => `/options/${optionId}`,
}
