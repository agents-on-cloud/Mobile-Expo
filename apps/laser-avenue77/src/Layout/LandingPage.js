/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import Checkmark from '../src/app/icons/checkmark.svg'


export const LandingPage = ({ navigation }) => {

  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Marketing
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('MarketingLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          

          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Notification
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('Notifications')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Provider
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('ProviderLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Appointment
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('AppointmentLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Billing
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('BillingLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Tasks
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('TasksLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Incident
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('IncidentLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  HR
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('Hr')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Performance
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('PerformanceLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Consumers
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('ConsumersLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
         
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Inventory
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('InventoryLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Suppliers
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('SuppliersLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
     
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Services
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('ServicesLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Facilities
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('FacilitiesLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.hero}>
              <View style={styles.heroTitle}>
                {/* <Checkmark
                  width={32}
                  height={32}
                  stroke="hsla(162, 47%, 50%, 1)"
                /> */}
                <Text style={[styles.textLg, styles.heroTitleText]}>
                  Knowledge Base 
                </Text>
              </View>
              <TouchableOpacity
                style={styles.whatsNextButton}
                onPress={() => {
                  navigation.navigate('KnowledgeBaseLandingPage')
                }}
              >
                <Text style={[styles.textMd, styles.textCenter]}>
                  GO
                </Text>
              </TouchableOpacity>
            </View>
          </View>










        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 0,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});

export default LandingPage;
