import React from 'react';

const User = props => {
    return(
        <div>{props.user.id}{' '}{props.user.username}{' '}{props.user.password}</div>
    )
}

export default User;