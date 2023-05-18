
import { 
    InputAdornment, FormControl, OutlinedInput, InputLabel
} from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import green from '@mui/material/colors/green'
import red from '@mui/material/colors/green'




type ComponentProps = {
    value?: string
    labelText: string 
    placeholder: string
    name: string
    id: string
    type?: string
    onChange: any
    onKeyPress?: any
    onFocus?: any 
    labelWidth: number
    styles?: object
    wrapperStyles?: object
    startAdornment?: any
    endAdornment?: any
    errorText?: string
    passwordConstraints?: object

    showConstraints?: boolean
    multiline?: boolean 
    rows?: number

    autoFocus?: boolean
}

const TextInputComponent = ({ value, labelText, placeholder, name, id, type, autoFocus=false, onChange, onKeyPress, onFocus, labelWidth, styles, wrapperStyles, startAdornment, endAdornment, multiline, rows, errorText, passwordConstraints, showConstraints }: ComponentProps)=> {
    styles = (styles == null) ? {} : styles
    wrapperStyles = wrapperStyles ? wrapperStyles : {}

    return (
        <FormControl 
            variant="outlined"
            style={{
                maxWidth: '440px',
                ...wrapperStyles
            }}
        >

            <InputLabel 
                htmlFor={id}
                style={{
                    width: labelWidth,
                    backgroundColor: 'white',
                }}
            >
                {labelText}
            </InputLabel>

            <OutlinedInput
                error={ errorText ? true : false }
                multiline={ multiline || false }
                rows={ rows || 0 }
                id={id}
                type={ type || 'text' }
                name={name}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                autoFocus={autoFocus}
                placeholder={placeholder}
                startAdornment={
                    <InputAdornment position="start">
                        {startAdornment || ''}
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        {endAdornment || ''}
                    </InputAdornment>
                }
        
                style={{
                    backgroundColor: 'transparent',
                    ...styles
                }}
            />

            {
                errorText && 
                <p style={{
                    marginTop: '2px',
                    marginLeft: '2px',
                    fontSize: '.8em',
                    color: '#ff1744',
                }}>
                {errorText}
                </p>
            }

            {/* if password, shwo these constraints */}
            {
                (type === 'password' && showConstraints) && 
                <PasswordConstraints 
                passwordConstraints={passwordConstraints} 
                />
            }
            
        </FormControl>
    )
}

  

const PasswordConstraints = ({ passwordConstraints })=> {
  const defaultValues = {
    hasUpperCaseLetter: false,
    hasLowerCaseLetter: false,
    hasNumber: false,
    hasSpecialCharacters: false,
    isLongEnough: false,
  }
  passwordConstraints = passwordConstraints ? passwordConstraints : defaultValues

  return (
    <div style={{
        marginTop: '8px'
    }}>
      <PasswordConstraint 
        text="Password should be atleast 6 characters long"
        isValid={passwordConstraints.isLongEnough}
      />
      <PasswordConstraint 
        text="Password should have 1 uppercase letter"
        isValid={passwordConstraints.hasUpperCaseLetter}
      />
      <PasswordConstraint 
        text="Password should have 1 lowercase letter"
        isValid={passwordConstraints.hasLowerCaseLetter}
      />
      <PasswordConstraint 
        text="Password should have 1 number"
        isValid={passwordConstraints.hasNumber}
      />
      <PasswordConstraint 
        text="Password should have 1 special character"
        isValid={passwordConstraints.hasSpecialCharacters}
      />
    </div>
  )
}


type PasswordConstraintProps = {
    text: string 
    icon?: any 
    isValid: boolean
}
const PasswordConstraint = ({ text, icon, isValid }: PasswordConstraintProps)=> {
  return (
    <div 
        style={{
            display: 'flex',
            alignItems: 'center',

            // backgroundColor: 'yellow',
            marginBottom: '6px'
        }}
    >
      {
        isValid 
        ? <CheckOutlinedIcon style={{ 
            color: green[500], 
            marginRight: '8px',
            fontSize: '1.2em', 
          }} />
        : <ErrorOutlineOutlinedIcon style={{ 
            color: red[400], 
            marginRight: '8px',
            fontSize: '1.2em', 
          }} />
      }
      <p style={{
            marginTop: '2px',
            marginLeft: '2px',
            fontSize: '.8em',
            color: isValid ? '#4caf50' : '#ff1744',
        }}>
            {text}
      </p>
    </div>
  )
}


export default TextInputComponent