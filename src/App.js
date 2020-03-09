import React from 'react';
import routes from '../router';
import { Link, Route, Switch } from 'react-router-dom';

class App extends React.Component{
    render(){
        return (
            <div>
                <Link to='/'>Home </Link>
                <Link to='/grid'> List</Link>
                <Switch>
                    {routes.map(({path, exact, component: C, ...rest })=>(
                        <Route 
                            path={path}
                            exact={exact}
                            key={path}
                            render={props =>  <C {...props} {...rest}/>}
                        />
                    ))}
                </Switch>
            </div>
        )
    }
}

export default App;