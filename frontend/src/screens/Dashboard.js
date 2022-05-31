import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { reset, getGoals } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'


//yo

const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    )

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate('/login');
        }
    }, [isError, message, user, navigate]);

    useEffect(() => {
        dispatch(getGoals());

        return () => dispatch(reset());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />
    }



    return (
        <>
            <section className='heading'>
                <h1>{ user && user.name }</h1>
            </section>
            <GoalForm />

            <section className='content'>
                { goals.length > 0 ? (
                    <div className='goals'>
                        { goals.map((goal) => (
                            <GoalItem key={ goal._id } goal={ goal } />
                        )) }
                    </div>
                ) : (<h2>You Have No goals yet</h2>) }
            </section>
        </>
    )
}

export default Dashboard


