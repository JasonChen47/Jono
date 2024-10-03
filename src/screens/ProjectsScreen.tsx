import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import { PageIndicator } from 'react-native-page-indicator';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from '../graphql/queries'
import LargeProjectCard from '../components/LargeProjectCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectsScreen = ({projects}: any) => {

const router = useRouter(); 

  const [users, setUsers] = useState<any>("");
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchUser = async (ownerID: any) => {
    
    const result = await API.graphql(
      graphqlOperation(getUser, { id: ownerID })
    );
    const castedResult = result as GraphQLResult<any>
    setUsers(castedResult.data?.getUser);
    
  };

  return (
    <View style={styles.pagerViewOuterContainer}>
    <PagerView 
      style={styles.pagerViewContainer} 
      initialPage={0}
      onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
      {projects.map((project: any, index: any) => (
        <View
          style={styles.largeProjectContainer}
          key={project.id}
          >
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/project/[id]',
                params: { id: project.id },
              })
            }
            style={styles.largeProjectContainer}
            >
          {/* <ImageBackground 
            style={styles.largeProjectImageBackground} 
            imageStyle={styles.largeProjectImage}
            // imageStyle={{ width: 100, height: 100 }}
            source={{uri: project.image}}
            resizeMode="cover"
            >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} // Darker at the top, lighter at the bottom
              style={styles.largeProjectGradient}
              >
              <View>
                <View style={styles.largeProjectTextContainer}>
                  <Text style={styles.largeProjectAuthor}>{project.author}</Text>
                  <Text style={styles.largeProjectTitle}>{project.title}</Text>
                </View>
                
              </View>
            </LinearGradient>
          </ImageBackground> */}
          
                <LargeProjectCard project = {project}/>
                <PageIndicator 
                  style={styles.indicator}
                  current={currentPage}
                  count={projects.length} // Adjust based on your number of pages
                  color='white'
                />
          </Pressable>
        </View>
      ))}
    </PagerView>
  </View>
  )
}

export default ProjectsScreen

const styles = StyleSheet.create({
    // Pager View
  pagerViewOuterContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  }, 
  pagerViewContainer: {
    width: '100%', 
    height: windowHeight/2.2,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  }, 
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
  },
   // Large projects
   largeProjectContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeProjectImageBackground: {
    width: '90%',
    height: '100%',
  },
  largeProjectImage: {
    // padding: 30,
    width: '100%',
    height: '100%', 
    borderRadius: 15,
    padding: 20
  }, 
  largeProjectTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 25, 
    width: windowWidth/1.1,
    height: '100%',
  },
  largeProjectAuthor: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  }, 
  largeProjectTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    flexShrink: 1,
    paddingTop: 10,
  }, 
  largeProjectGradient: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    borderRadius: 15, // Match the border radius of the image
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    alignItems: 'flex-end',
    padding: 25,
  },
})