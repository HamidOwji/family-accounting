export default function getStyles(theme) {
    return ({
        mainDiv: {
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            position: 'absolute',
            width: '50%',
            backgroundColor: theme.palette.background.white,
            border: theme.palette.primary.main,
            boxShadow: 24,
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    }
    )
}
