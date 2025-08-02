import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../ui/Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toContain('Click me')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive'
      },
      slots: {
        default: 'Delete'
      }
    })
    
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
}) 