export default {
  root: '/',
  login: '/login',
  signup: '/signup',
  options: {
    new: '/options/new',
    show: (optionId: string): string => `/options/${optionId}`,
  },
}
