import type { UseCheckboxProps } from '@chakra-ui/checkbox';
import { useCheckbox } from '@chakra-ui/checkbox'
import type {
  SystemStyleObject,
  ThemingProps,
  HTMLChakraProps,
} from '@chakra-ui/system';
import {
  chakra,
  forwardRef,
  omitThemingProps,
} from '@chakra-ui/system'
import { dataAttr, __DEV__ } from '@chakra-ui/utils'
import * as React from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

import styles from './ColorModeToggler.module.css';

export interface ColorModeTogglerProps
  extends Omit<UseCheckboxProps, 'isIndeterminate'>,
  Omit<HTMLChakraProps<'label'>, keyof UseCheckboxProps>,
  ThemingProps<'Switch'> {
}

export const ColorModeToggler = forwardRef<ColorModeTogglerProps, 'input'>((props, ref) => {
  const ownProps = omitThemingProps(props);
  const { toggleColorMode } = useColorMode();

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getRootProps,
  } = useCheckbox(ownProps);

  const trackStyles: SystemStyleObject = {
    bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.200'),
  }

  const thumbStyles: SystemStyleObject = {
    bg: useColorModeValue('white', 'black'),
  }

  return (
    <chakra.label
      { ...getRootProps({ onChange: toggleColorMode }) }
      className={ styles.root }
    >
      <input className={ styles.input } { ...getInputProps({}, ref) }/>
      <chakra.div
        { ...getCheckboxProps() }
        className={ styles.track }
        __css={ trackStyles }
      >
        <MoonIcon className={ styles.nightIcon } boxSize={ 4 } color={ useColorModeValue('blue.600', 'white') }/>
        <chakra.div
          className={ styles.thumb }
          data-checked={ dataAttr(state.isChecked) }
          data-hover={ dataAttr(state.isHovered) }
          __css={ thumbStyles }
        />
        <SunIcon className={ styles.dayIcon } boxSize={ 4 } color={ useColorModeValue('gray.500', 'blue.600') }/>
      </chakra.div>
    </chakra.label>
  )
})

if (__DEV__) {
  ColorModeToggler.displayName = 'ColorModeToggler'
}