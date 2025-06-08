// components/CreateClientDrawer.tsx
import React, { forwardRef, useCallback, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '@themes/theme';
import { styles } from './styles';
import { maskCurrency, unmaskCurrency } from '@utils/mask';

interface CreateClientDrawerProps {
  onSubmit: (client: { name: string; salary: number; companyValuation: number }) => void;
}

const CreateClientDrawer = forwardRef<BottomSheet, CreateClientDrawerProps>(({ onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState<string>('');
  const [companyValuation, setCompanyValuation] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs para os inputs
  const salaryInputRef = useRef<TextInput>(null);
  const companyValuationInputRef = useRef<TextInput>(null);

  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      Keyboard.dismiss();

      onSubmit({
        name: name.trim(),
        salary: unmaskCurrency(salary),
        companyValuation: unmaskCurrency(companyValuation),
      });

      setName('');
      setSalary('');
      setCompanyValuation('');

      // @ts-ignore
      ref.current?.close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSalaryChange = (text: string) => {
    const maskedValue = maskCurrency(text);
    setSalary(maskedValue);
  };

  const handleCompanyValuationChange = (text: string) => {
    const maskedValue = maskCurrency(text);
    setCompanyValuation(maskedValue);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => Keyboard.dismiss()}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      onClose={() => Keyboard.dismiss()}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Criar cliente</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                placeholderTextColor={theme.colors.placeholder}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => salaryInputRef.current?.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Salário:</Text>
              <TextInput
                ref={salaryInputRef}
                style={styles.input}
                placeholder="R$ 0,00"
                value={salary}
                onChangeText={handleSalaryChange}
                placeholderTextColor={theme.colors.placeholder}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => companyValuationInputRef.current?.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Valor da empresa:</Text>
              <TextInput
                ref={companyValuationInputRef}
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
                placeholder="R$ 0,00"
                value={companyValuation}
                onChangeText={handleCompanyValuationChange}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, (!name.trim() || isSubmitting) && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colors.textSecondary} />
              ) : (
                <Text style={styles.submitButtonText}>Criar cliente</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default CreateClientDrawer;