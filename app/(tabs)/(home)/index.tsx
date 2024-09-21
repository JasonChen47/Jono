import { Image, View, Text, SafeAreaView, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { TabView, TabBar, SceneRendererProps, NavigationState, Route, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Searchbar } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const sampleProjects = [
  {
    id: 1,
    title: 'Renewable energy powered robot to clean oceans',
    image: require('../../../assets/images/solar.png'),
    author: 'Barack Obama',
    description: 'This robot will be powered by solar power as well as the mechanical movement of the waves. I am looking for some engineers who are interested in working with me on the project.',
    skills: ['Engineering', 'Coding', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 2,
    title: 'Wave-powered method to desalinate water',
    image: require('../../../assets/images/cleanocean.jpg'),
    author: 'Jennifer Lawrence',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 3,
    title: 'App that automatically translates to pinyin',
    image: require('../../../assets/images/chinese.png'),
    author: 'Steve Carrel',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 4,
    title: 'Advertising to help the homeless',
    image: require('../../../assets/images/homeless.png'),
    author: 'Ryan Reynolds',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 5,
    title: 'Genetically modified camel',
    image: require('../../../assets/images/camel.png'),
    author: 'Pablo Picasso',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 6,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 7,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
];

// Props for the FlatList 

type ItemProps = {
  title: string
  image: any
  author: string
};

const Item = ({title, image, author, }: ItemProps) => (
  <View style={styles.browseProjectsView}>
    <Image style={styles.browseProjectImages} source={image} />
    <View style={styles.linearGradientView}>
      <LinearGradient 
        style={styles.browseLinearGradient}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
      </LinearGradient>
    </View>
    <View style={styles.browseOverImageTextView}>
      <Text style={styles.browseProjectsText}>{title}</Text>  
      <Text style={styles.browseAuthorText}>
          {author}
      </Text>
    </View>
  </View>
);

const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView>
    <View style={styles.searchBarContainer}>
      {/* <Text>hi</Text> */}
      <Searchbar
        style={styles.searchBar}
        placeholder="Assemble the perfect team"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
    </SafeAreaView>
  )
}

// The projects in the large paging view 
function PagerProjects() {
  return (
    <View style={styles.pagerViewOuterContainer}>
      <PagerView style={styles.pagerViewContainer} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}

// Screen that can be filtered and used for all screens
function ProjectsScreen() {
  return (
    <View style={styles.flatListOuterContainer} >
      
      <Tabs.FlatList 
        nestedScrollEnabled={true}
        ListHeaderComponentStyle={styles.flatListHeaderStyle}
        ListHeaderComponent={
          <PagerProjects/>
        }
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.flatListColumnWrapper}
        numColumns={2}
        data={sampleProjects}
          renderItem={({item}) => (
          <View>
            <Item title={item.title} image={item.image} author={item.author}/>
          </View>
        )}
      />
    </View>
  );
}

function NewProjectsScreen() {
  return (
    <View style={styles.flexBoxContainer}>
    {sampleProjects.map((item, index) => (
      <View key={index} style={styles.flexBoxGridItem}>
        <Image style={styles.flexBoxImage} source={item.image}/>
        <Text style={styles.flexBoxText}>{item.title}</Text>
      </View>
    ))}
  </View>
  );
}

const index = () => {
 
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* <View style={styles.tabsContainer}> */}
      <Tabs.Container 
        
        // headerContainerStyle={styles.headerContainer}
        pagerProps={{ scrollEnabled: false }}
        headerHeight={50}
        minHeaderHeight={50}
        renderHeader={Header}  
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled={true} // Enable scrollable tabs
            tabStyle={{ height: 70 }} // Customize the width of each tab
            
          />
        )}
        >
        <Tabs.Tab 
          name="My Projects" 
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="star" size={22} />
              <Text style={styles.tabLabelText}>All</Text>
            </View>
          ) })}
          >
          <Tabs.ScrollView>
          {/* <ProjectsScreen/> */}
          <NewProjectsScreen/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Health"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="user-doctor" size={22} />
              <Text style={styles.tabLabelText}>Health</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Finance"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="money-check-dollar" size={22} />
              <Text style={styles.tabLabelText}>Finance</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Tech"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="gear" size={22} />
              <Text style={styles.tabLabelText}>Tech</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Politics"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="globe" size={22} />
              <Text style={styles.tabLabelText}>Politics</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Education"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="book" size={22} />
              <Text style={styles.tabLabelText}>Education</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Environment"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="leaf" size={22} />
              <Text style={styles.tabLabelText}>Environment</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Justice"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="scale-balanced" size={22} />
              <Text style={styles.tabLabelText}>Social Justice</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
      </Tabs.Container>
      {/* </View> */}
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  tabsContainer: {
    // marginTop: 100, 
    // flex: 1,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  tabLabelContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingLeft: 7, 
    paddingRight: 7,
  }, 
  tabLabelText: {
    paddingTop: 5, 
    paddingBottom: 0, 
    fontSize: 12,
  }, 
  searchBarContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    backgroundColor: '#E8E8E8',
    height: 50,
  },
  pagerView: {
    flex: 1,
  },
  // Browse styles
  linearGradientView: {
    top: 0,  // Set to top of the image
    left: 0, // Set to the left side
    right: 0, // Set to the right side
    bottom: 0, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, 
  flatListContent: {
    paddingHorizontal: (windowWidth-2*(windowWidth/2.5))/3, // Padding on the left and right
  },
  browseProjectsView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  browseProjectImages: {
    width: windowWidth/2.1, 
    height: windowHeight/5,
    borderRadius: 15, 
  },
  browseProjectsText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    justifyContent: 'flex-end',
  }, 
  browseOverImageTextView: {
    top: 15,  // Set to top of the image
    left: 15, // Set to the left side
    right: 15, // Set to the right side
    bottom: 15, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  browseLinearGradient: {
    width: windowWidth/2.2, 
    height: windowHeight/5/1.5,
    borderRadius: 15, 
  },
  browseAuthorText: {
    fontSize: 10,
    color: 'white',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
  flatListContainer: {
    flexGrow: 1,
    // paddingHorizontal: 5,
  }, 
  flatListColumnWrapper: {
    justifyContent: 'space-between', // Evenly space out the columns
  },
  pagerViewContainer: {
    // alignSelf: 'stretch',
    // flex: 1,
    width: '100%', 
    height: '100%',
  }, 
  page: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    // alignSelf: 'stretch',
    // flex: 1,
  },
  pagerViewOuterContainer: {
    width: '90%', 
    height: '90%', 
  }, 
  flatListHeaderStyle: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  flatListOuterContainer: {
    flexGrow: 1, 
  }, 
  flexBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  flexBoxGridItem: {
    // backgroundColor: '#ddd',
    width: '48%', // Two items per row with spacing
    marginBottom: 10,
    // padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // width: windowWidth/2.2,
    // height: windowHeight/5, 
  },
  flexBoxImage: {
    width: windowWidth/2.2, 
    height: windowHeight/5, 
    borderRadius: 15,
  },
  flexBoxText: {
    paddingTop: 5, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'bold'
    // padding: 5,
  }
})
