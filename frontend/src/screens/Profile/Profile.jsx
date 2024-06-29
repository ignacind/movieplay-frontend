import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ModalAccount from './Modal/ModalAccount';
import ProfilePicture from './Profile.picture';
import ProfileNickName from './Profile.nickname';
import LoadingPage from '../../components/LoadingPage';
import useFetchProfile from '../../hooks/useFetchProfile';
import { styles } from './Profile.styles';

export default function Profile() {
    const [deleteACCModalVisible, setDeleteACCModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const userId = useSelector(state => state.user.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const { user, loading } = useFetchProfile(userId, isAuthenticated);

    if (!isAuthenticated || loading || !user) {
        return (
            <View style={styles.container}>
                <LoadingPage />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProfilePicture picture_url={user.profilePictureLink} />

            <View style={styles.infoContainer}>
                <Text style={styles.infoContainer.nameText}>{user.realName}</Text>
                <Text style={styles.infoContainer.emailText}>{user.email}</Text>
            </View>

            <ProfileNickName initialNickName={user.nickname} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: '#D9D9D9' }]}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={logoutModalVisible}
                    setModalVisible={setLogoutModalVisible}
                    infoModal={'Logout'}
                />

                <TouchableOpacity
                    style={[styles.buttonsContainer.btnSpace, { backgroundColor: '#D51D53' }]}
                    onPress={() => setDeleteACCModalVisible(true)}
                >
                    <Text style={styles.buttonsContainer.textBtn}>Eliminar cuenta</Text>
                </TouchableOpacity>

                <ModalAccount
                    modalVisible={deleteACCModalVisible}
                    setModalVisible={setDeleteACCModalVisible}
                    infoModal={'DeleteAccount'}
                />
            </View>
        </View>
    );
}

