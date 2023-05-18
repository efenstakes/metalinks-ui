import { Skeleton } from '@mui/material'
import AppbarComponent from '../components/appbar/component'
import SectionTitleComponent from '../components/section_title/section_title.component'
import VSpacerComponent from '../components/v_spacer/v_spacer.component'



// components




const ProfileLoadingPage = () => {
    return (
        <div className='page'>
                        
            {/* appbar */}
            <AppbarComponent />

            {/* avatars */}
            <div className="profile_avatars_container">

                <Skeleton 
                    className="profile_avatars_container__avatar_container__big_avatar absolute"
                    width="100%" height={400}
                />

                <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
                    <div
                    className="profile_avatars_container__avatar_container__avatar__loading su_3" 
                    />
                </div>

            </div>
            <VSpacerComponent space={.5} />

            {/* name & stats */}
            <div className="column ca_center profile_info_container">

                <Skeleton width="36%" height={48} className='su_7' />
                <VSpacerComponent space={.5} />

                <Skeleton width="25%" height={24} className='su_9' />
                <VSpacerComponent space={1.5} />

                <div className="row ma_evenly ca_center profile_info_container__chips">

                    <Skeleton width="20%" height={56} className='su_12' />
                    <Skeleton width="20%" height={56} className='su_14' />
                    <Skeleton width="20%" height={56} className='su_17' />

                </div>

            </div>
            <VSpacerComponent space={6} />

            {/* metalinks if any */}
            <SectionTitleComponent title='Links' />
            <div className="padded_container_lg">
                { 
                    Array(6).fill(0).map((_, index: number)=> {

                        return (
                            <Skeleton width="100%" height={56} className={`su_${10+index}`} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ProfileLoadingPage