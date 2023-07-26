import DummyPost from './DummyPost';
import './LoadingSkeleton.css';
export type LoadingSkeletonProps = {
    loading: boolean;
}

export default function LoadingSkeleton(props: LoadingSkeletonProps) {
    console.log(props.loading);
    return props.loading ? <ul className="loading__skel">
        {[0, 1, 2, 3].map(dummy => <DummyPost key={dummy} />)}
    </ul> : null
}
