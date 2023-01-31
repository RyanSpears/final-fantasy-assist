import { mount } from '@vue/test-utils'
import Dashboard from '../../components/Dashboard.vue'

test('mount component', async () => {
  expect(Dashboard).toBeTruthy()

  const wrapper = mount(Dashboard, {})

  expect(wrapper.text()).toContain('Welcome to Final Fantasy Assist')
  expect(wrapper.html()).toMatchSnapshot()
})
