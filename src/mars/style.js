const style = (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    note: {
        fontSize: 11
    },
    control: {
      padding: theme.spacing(2),
    },
    robot_form: {
        border: "1px solid #d0cfcf",
        borderRadius: "4px",
        padding:"15px",
        textAlign: "center",
        margin: "10px",
        boxSizing: "border-box",
        "& > div > div": {
            width:" 100% !important"
        }
        
    },
    add_robot: {
    marginLeft:'18px'
    },
    button:{
        margin:'10px'
    },
    robot_result: {
        paddingLeft: '18px',
        "& > p": {
            margin: "0px !important"
        }

    },
  });

  export default style;