import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
// Fires a function when the component is rendered. We don't want to fetch every time it the component is rendered. The empty dependancy array make sure it only fetches once.
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />     
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home