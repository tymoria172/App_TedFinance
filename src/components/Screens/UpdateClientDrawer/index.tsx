// components/CreateClientDrawer.tsx
import React, { forwardRef, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import { styles } from './styles';
import { maskCurrency, unmaskCurrency } from '@utils/mask';
import { Client } from '@models/Client';
import { theme } from '@themes/theme';

interface UpdateClientDrawerProps {
  userId: string;
  onSubmit: (client: { id: string; name: string; salary: number; companyValuation: number }) => void;
  initialData?: Client | null;
}

const UpdateClientDrawer = forwardRef<BottomSheet, UpdateClientDrawerProps>(({ onSubmit, userId, initialData }, ref) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState<string>('');
  const [companyValuation, setCompanyValuation] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs para os inputs
  const salaryInputRef = useRef<TextInput>(null);
  const companyValuationInputRef = useRef<TextInput>(null);

  // Atualiza os estados quando initialData muda
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSalary(initialData.salary ? maskCurrency(initialData.salary.toString()) : '');
      setCompanyValuation(initialData.companyValuation ? maskCurrency(initialData.companyValuation.toString()) : '');
    }
  }, [initialData]);

  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      Keyboard.dismiss();

      onSubmit({
        id: userId,
        name: name.trim(),
        salary: unmaskCurrency(salary),
        companyValuation: unmaskCurrency(companyValuation),
      });

      // Limpa os campos após o submit
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
            <Text style={styles.title}>Editar cliente</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => salaryInputRef.current?.focus()}

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
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => companyValuationInputRef.current?.focus()}

              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Valor da empresa:</Text>
              <TextInput
                ref={companyValuationInputRef}
                style={styles.input}
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
                <Text style={styles.submitButtonText}>Editar cliente</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default UpdateClientDrawer;