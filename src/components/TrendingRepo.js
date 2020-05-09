import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import NavigationService from '../services/NavigationService';

export default TrendingRepo;

const TrendingRepo = ({data, onFavorite, theme}) => {
  const goDetail = () => {
    // NavigationService.navigate('Web', {
    //   url: data.url,
    //   title: data.name,
    // });
  };

  const handleFavorite = () => {
    onFavorite(data, !data.isFavorite);
  };

  if (!data) {
    return null;
  }
  return (
    <View style={styles.cell_container}>
      <Text style={styles.title}>{data.name}</Text>
      <TouchableHighlight onPress={goDetail}>
        <Text style={styles.description}>{data.description}</Text>
      </TouchableHighlight>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.author}>Built by </Text>
          {(data.builtBy || []).map((item) => (
            <Image
              key={item.username}
              style={styles.avatar}
              source={{uri: item.avatar}}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleFavorite}>
          <Icon
            name="grade"
            color={data.isFavorite ? theme : '#E5E5E5'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
    flex: 1,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  author: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  avatar: {
    height: 22,
    width: 22,
    borderRadius: 11,
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
});
